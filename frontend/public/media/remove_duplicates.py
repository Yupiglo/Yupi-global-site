#!/usr/bin/env python3
"""
Script pour supprimer les fichiers dupliqués dans les médias
Conserve la version la plus récente (priorité à 2025 > 2023 > 2022 > 2021)
"""

import os
import hashlib
from collections import defaultdict
from pathlib import Path

def get_file_hash(filepath):
    """Calcule le hash MD5 d'un fichier"""
    hash_md5 = hashlib.md5()
    try:
        with open(filepath, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()
    except Exception as e:
        print(f"Erreur lors du calcul du hash pour {filepath}: {e}")
        return None

def get_year_priority(filepath):
    """Retourne la priorité d'une année (plus grand = plus prioritaire)"""
    path_str = str(filepath)
    if "/2025/" in path_str:
        return 5
    elif "/2023/" in path_str:
        return 3
    elif "/2022/" in path_str:
        return 2
    elif "/2021/" in path_str:
        return 1
    return 0

def remove_duplicates(base_path="."):
    """Supprime les fichiers dupliqués"""
    files_by_hash = defaultdict(list)
    files_to_remove = []
    total_size_to_free = 0
    
    print("🔍 Analyse des fichiers...")
    
    # Parcourir tous les fichiers et calculer les hash
    for root, dirs, files in os.walk(base_path):
        # Ignorer le script lui-même
        if "remove_duplicates.py" in files:
            files.remove("remove_duplicates.py")
        
        for file in files:
            filepath = os.path.join(root, file)
            if os.path.isfile(filepath):
                file_hash = get_file_hash(filepath)
                if file_hash:
                    files_by_hash[file_hash].append(filepath)
    
    print(f"✅ {len(files_by_hash)} fichiers analysés")
    
    # Identifier les doublons
    print("\n🔍 Identification des doublons...")
    for file_hash, paths in files_by_hash.items():
        if len(paths) > 1:
            # Trier par priorité (année la plus récente en premier)
            paths_sorted = sorted(paths, key=lambda p: (get_year_priority(p), p), reverse=True)
            
            # Garder le premier (le plus récent), marquer les autres pour suppression
            file_to_keep = paths_sorted[0]
            for file_to_remove in paths_sorted[1:]:
                files_to_remove.append(file_to_remove)
                total_size_to_free += os.path.getsize(file_to_remove)
    
    print(f"✅ {len(files_to_remove)} fichiers dupliqués identifiés")
    print(f"💾 Espace à libérer: {total_size_to_free / (1024*1024):.2f} MB")
    
    if not files_to_remove:
        print("\n✅ Aucun doublon trouvé !")
        return
    
    # Demander confirmation
    print(f"\n⚠️  {len(files_to_remove)} fichiers dupliqués seront supprimés")
    print("Les versions les plus récentes seront conservées.")
    
    # Supprimer les doublons
    print("\n🗑️  Suppression des doublons...")
    removed_count = 0
    error_count = 0
    
    for filepath in files_to_remove:
        try:
            os.remove(filepath)
            removed_count += 1
            if removed_count % 100 == 0:
                print(f"  ✅ {removed_count}/{len(files_to_remove)} fichiers supprimés...")
        except Exception as e:
            print(f"  ❌ Erreur lors de la suppression de {filepath}: {e}")
            error_count += 1
    
    print(f"\n✅ Nettoyage terminé !")
    print(f"   - Fichiers supprimés: {removed_count}")
    print(f"   - Erreurs: {error_count}")
    print(f"   - Espace libéré: {total_size_to_free / (1024*1024):.2f} MB")
    
    return removed_count, total_size_to_free

if __name__ == "__main__":
    remove_duplicates()

