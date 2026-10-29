from pdf2image import convert_from_path
import os

images = convert_from_path('*.pdf', dpi=150)

for i, img in enumerate(images):
    img.save(f'page-{i+1}.webp', 'WEBP', quality=80)
    print(f"page-{i+1}.webp 完了")