import os
import math
from PIL import Image, ImageOps

# ------------------- CONFIGURATION -------------------
# --- You can change these settings ---

# 1. The main folder to search for images (use a raw string 'r' for Windows paths)
ROOT_DIR = r'D:\User\Yevhen\Documents\GitHub\m4sub\public\news\images'

# 2. A folder to save all the output grid images (will be created inside ROOT_DIR)
OUTPUT_DIR_NAME = 'output_grids'

# 3. The string to identify files you want to INCLUDE
INCLUDE_STRING = '(Custom)'

# 4. The number of columns in the final image grid for each folder
GRID_COLUMNS = 3

# 5. The final size for each square image in the grid (width, height)
THUMBNAIL_SIZE = 250

# 6. The margin (space) in pixels between each image in the grid
GRID_MARGIN = 10

# 7. Supported image file extensions
SUPPORTED_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')

# ------------------- END OF CONFIGURATION -------------------

def create_image_grid(image_paths, columns, thumb_size, margin, output_filename):
    """
    Combines a list of pre-squared images into a single grid with a transparent background.
    """
    if not image_paths:
        print("  - No images to process. Skipping grid creation.")
        return

    # Process images first by resizing them
    print(f"  - Resizing {len(image_paths)} images...")
    thumbnails = []
    for path in image_paths:
        try:
            with Image.open(path) as img:
                # Convert to RGBA to ensure it has an alpha channel for transparency
                img = img.convert("RGBA")
                # Resize the image directly to the target square size
                img = img.resize((thumb_size, thumb_size), Image.Resampling.LANCZOS)
                thumbnails.append(img)
        except Exception as e:
            print(f"  - WARNING: Could not process file '{os.path.basename(path)}'. Error: {e}")

    if not thumbnails:
        print("  - No valid thumbnails could be created. Skipping grid.")
        return

    # Calculate grid dimensions
    num_images = len(thumbnails)
    columns = min(columns, num_images) if num_images > 0 else 1
    num_rows = math.ceil(num_images / columns)
    
    # Calculate the size of the final grid image, including margins
    cell_width = thumb_size + margin
    cell_height = thumb_size + margin
    grid_width = (columns * cell_width) + margin
    grid_height = (num_rows * cell_height) + margin

    print(f"  - Creating a {columns}x{num_rows} grid.")
    print(f"  - Final image size will be {grid_width}x{grid_height} pixels.")

    # Create a new blank canvas with a transparent background
    canvas = Image.new('RGBA', (grid_width, grid_height), (255, 255, 255, 0))
    
    # Paste each thumbnail into the canvas
    for i, thumb in enumerate(thumbnails):
        row = i // columns
        col = i % columns
        
        # Calculate position, including margins
        paste_x = margin + col * cell_width
        paste_y = margin + row * cell_height

        # Paste the thumbnail onto the canvas
        canvas.paste(thumb, (paste_x, paste_y), thumb)
            
    # Save the final image
    try:
        canvas.save(output_filename, 'PNG')
        print(f"  - SUCCESS: Grid saved as '{output_filename}'\n")
    except Exception as e:
        print(f"  - ERROR: Could not save the final image. Error: {e}\n")

# --- Main script execution ---
if __name__ == "__main__":
    # Define the full path for the output directory
    output_dir_path = os.path.join(ROOT_DIR, OUTPUT_DIR_NAME)
    
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir_path):
        os.makedirs(output_dir_path)
        print(f"Created output directory: '{output_dir_path}'")

    print(f"\nStarting to process folders in '{ROOT_DIR}'...")
    
    for folder_name in sorted(os.listdir(ROOT_DIR)):
        folder_path = os.path.join(ROOT_DIR, folder_name)
        
        # Conditions to SKIP a folder: it's not a directory or it's the output folder
        if not os.path.isdir(folder_path) or folder_name == OUTPUT_DIR_NAME:
            continue
            
        print(f"Processing folder: '{folder_name}'")
        
        # Find all valid image files in the current folder that MATCH the include string
        image_paths_in_folder = []
        for file in sorted(os.listdir(folder_path)):
            # ** LOGIC INVERTED HERE **
            # We now check IF the include string is IN the filename
            if INCLUDE_STRING in file and file.lower().endswith(SUPPORTED_EXTENSIONS):
                full_path = os.path.join(folder_path, file)
                image_paths_in_folder.append(full_path)
        
        # If we found valid images, create a grid for them
        if image_paths_in_folder:
            output_filename = os.path.join(output_dir_path, f"{folder_name}_custom_grid.png")
            
            create_image_grid(
                image_paths_in_folder,
                GRID_COLUMNS,
                THUMBNAIL_SIZE,
                GRID_MARGIN,
                output_filename
            )
        else:
            print("  - No valid images found to combine in this folder.\n")

    print("--- All folders processed. ---")