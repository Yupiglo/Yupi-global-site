#!/bin/bash

echo "=========================================="
echo "  Configuration Git Credentials"
echo "=========================================="
echo ""
echo "Ce script va vous aider à configurer vos credentials Git."
echo ""

# Demander le token
read -p "Collez votre Personal Access Token GitHub: " TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ Token vide. Abandon."
    exit 1
fi

# Demander le username
read -p "Votre nom d'utilisateur GitHub: " USERNAME

if [ -z "$USERNAME" ]; then
    echo "❌ Username vide. Abandon."
    exit 1
fi

# Configurer l'URL avec le token
echo ""
echo "Configuration du remote avec le token..."
git remote set-url origin https://${TOKEN}@github.com/Yupiglo/Yupi-global-site.git

# Tester la connexion
echo ""
echo "Test de la connexion..."
if git ls-remote origin > /dev/null 2>&1; then
    echo "✅ Connexion réussie !"
    echo ""
    echo "Vous pouvez maintenant push avec :"
    echo "  git push origin main"
    echo ""
    echo "⚠️ Note : Le token est stocké dans la config Git."
    echo "   Pour le retirer plus tard :"
    echo "   git remote set-url origin https://github.com/Yupiglo/Yupi-global-site.git"
else
    echo "❌ Erreur de connexion. Vérifiez votre token."
    exit 1
fi

