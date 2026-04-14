// src/modules/products/ProductService.ts

import { db } from '@/lib/db/client';
import { ValidationError } from '@/lib/utils/errors';
import { z } from 'zod';

export const ProductSchema = z.object({
  slug: z.string().min(3),
  productLine: z.enum(['ira', 'sparsh']),
  name: z.string().min(2),
  description: z.string().optional(),
  shortDesc: z.string().optional(),
  mediaUrls: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    type: z.enum(['image', 'video']).default('image'),
    order: z.number().default(0),
  })).default([]),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
  sortOrder: z.number().default(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;

export class ProductService {
  /**
   * Public: List published products by line
   */
  async listByLine(line: 'ira' | 'sparsh') {
    const { data, error } = await db
      .from('products')
      .select('*')
      .eq('product_line', line)
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  }

  /**
   * Public: Get product by slug
   */
  async getBySlug(slug: string) {
    const { data, error } = await db
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) return null;
    return data;
  }

  /**
   * Admin: Create or Update Product
   */
  async saveProduct(input: ProductInput, id?: string) {
    const validated = ProductSchema.parse(input);

    const data = {
      slug: validated.slug,
      product_line: validated.productLine,
      name: validated.name,
      description: validated.description,
      short_desc: validated.shortDesc,
      media_urls: validated.mediaUrls,
      tags: validated.tags,
      is_published: validated.isPublished,
      sort_order: validated.sortOrder,
      meta_title: validated.metaTitle,
      meta_description: validated.metaDescription,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      const { data: result, error } = await db
        .from('products')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return result;
    } else {
      const { data: result, error } = await db
        .from('products')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    }
  }

  /**
   * Admin: List all products
   */
  async listAll() {
    const { data, error } = await db
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
}
