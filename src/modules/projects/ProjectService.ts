// src/modules/projects/ProjectService.ts

import { db } from '@/lib/db/client';
import { z } from 'zod';

export const ProjectSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(2),
  clientName: z.string().optional(),
  city: z.string().optional(),
  yearCompleted: z.number().int().optional(),
  description: z.string().optional(),
  mediaUrls: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    type: z.enum(['image', 'video']).default('image'),
    order: z.number().default(0),
  })).default([]),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  sortOrder: z.number().default(0),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

export class ProjectService {
  /**
   * Public: List published projects
   */
  async listPublished(featuredOnly: boolean = false) {
    let query = db
      .from('projects')
      .select('*')
      .eq('is_published', true);

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query.order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  }

  /**
   * Public: Get project by slug
   */
  async getBySlug(slug: string) {
    const { data, error } = await db
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) return null;
    return data;
  }

  /**
   * Admin: Save Project
   */
  async saveProject(input: ProjectInput, id?: string) {
    const validated = ProjectSchema.parse(input);

    const data = {
      slug: validated.slug,
      title: validated.title,
      client_name: validated.clientName,
      city: validated.city,
      year_completed: validated.yearCompleted,
      description: validated.description,
      media_urls: validated.mediaUrls,
      tags: validated.tags,
      is_featured: validated.isFeatured,
      is_published: validated.isPublished,
      sort_order: validated.sortOrder,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      const { data: result, error } = await db
        .from('projects')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return result;
    } else {
      const { data: result, error } = await db
        .from('projects')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    }
  }

  /**
   * Admin: List all
   */
  async listAll() {
    const { data, error } = await db
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
}
