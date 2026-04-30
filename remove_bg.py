from PIL import Image

def remove_background(input_path, output_path, threshold=40):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Get the background color from the top-left pixel
    bg_color = data[0]
    
    new_data = []
    for item in data:
        # Calculate color difference
        diff = abs(item[0] - bg_color[0]) + abs(item[1] - bg_color[1]) + abs(item[2] - bg_color[2])
        if diff < threshold:
            # Make it fully transparent
            new_data.append((255, 255, 255, 0))
        else:
            # Use anti-aliasing by adjusting alpha based on difference
            alpha = min(255, int((diff - threshold) * 255 / 20)) if diff < threshold + 20 else 255
            new_data.append((item[0], item[1], item[2], alpha))
            
    img.putdata(new_data)
    
    # Crop the image to its bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

if __name__ == "__main__":
    remove_background('c:/roopstone/public/new-logo.jpg', 'c:/roopstone/public/logo-transparent.png')
