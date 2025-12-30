#!/bin/bash
# Recommandé : installer 'webp' (sudo apt install webp)

# Détection du dossier du script pour trouver public/media peu importe d'où on le lance
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MEDIA_DIR="$SCRIPT_DIR/../public/media"

if [ ! -d "$MEDIA_DIR" ]; then
  echo "Erreur : Le dossier $MEDIA_DIR n'existe pas."
  exit 1
fi

echo "Début de la conversion des images en WebP dans $MEDIA_DIR..."

find "$MEDIA_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read img; do
  echo "Conversion de $img..."
  cwebp -q 80 "$img" -o "${img%.*}.webp" && rm "$img"
done

echo "Conversion terminée."
