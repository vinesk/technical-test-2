# Test Technique - Réponses / Technical Test - Answers

# Version Française

## Bugs identifiés et solutions

### 1. Configuration et Infrastructure

- **Problème** : Configuration MongoDB peu robuste et variables d'environnement mal organisées
- **Solution** :
  - Réorganisation des variables d'environnement
  - Amélioration de la gestion de connexion MongoDB
- **Raison** : Assurer la stabilité et la sécurité de l'application
- **Commits associés** : [133de42, 9f0e836]

### 2. Gestion des Projets

- **Problème** : Erreurs lors de l'affichage et la création des projets
- **Solution** :
  - Correction des erreurs undefined dans project/view.js
  - Amélioration de l'affichage de la création de projet
  - Correction de l'édition des projets
- **Raison** : Fiabiliser la gestion des projets
- **Commits associés** : [8281ec3, e3e0f34, 1ef8499]

### 3. Gestion des Utilisateurs

- **Problème** : Liste des utilisateurs non mise à jour et édition impossible
- **Solution** :
  - Mise à jour en temps réel de la liste des utilisateurs
  - Implémentation de l'édition des utilisateurs
- **Raison** : Améliorer l'expérience utilisateur
- **Commits associés** : [89a48d5, 7ec3b27]

### 4. Gestion des Activités

- **Problème** : Bugs dans la gestion des activités
- **Solution** :
  - Ajout de clés uniques pour React
  - Correction de la logique de suppression
  - Implémentation de la vérification des conflits par jour
- **Raison** : Assurer la cohérence des données
- **Commits associés** : [bfb6def, a70926f, c86854c]

### 5. Authentification et Gestion des Comptes

- **Problème** : Bugs dans l'authentification et la gestion des comptes
- **Solution** :
  - Amélioration de l'édition des comptes
  - Validation des noms d'utilisateurs uniques
  - Gestion des requêtes API pendant le démontage des composants
- **Raison** : Sécuriser et fiabiliser l'authentification
- **Commits associés** : [9551719, ad10a28, c0c9f87, f8e2b7d]

## Fonctionnalités développées

### 1. Amélioration de l'Infrastructure

- Meilleure gestion des erreurs MongoDB
- **Objectif** : Assurer la stabilité de l'application

### 2. Gestion des Projets et Utilisateurs

- Système complet de CRUD pour les projets et utilisateurs
- **Objectif** : Faciliter la gestion des données

### 3. Système d'Activités

- Gestion des conflits temporels
- Interface de suppression et mise à jour
- **Objectif** : Améliorer la gestion du temps

## Retours sur le code/architecture

### Points Positifs

- Architecture modulaire bien pensée
- Séparation claire frontend/backend
- Utilisation de React

### Points d'Amélioration

- Besoin d'une meilleure gestion des erreurs
- Manque de tests unitaires
- Documentation à enrichir
- Typage plus strict recommandé

### Difficultés Rencontrées

- Configuration initiale complexe
- Gestion des états React et du cycle de vie des composants
- Synchronisation des données entre frontend et backend
- Validation robuste des entrées utilisateur

---

# English Version

## Identified Bugs and Solutions

### 1. Configuration and Infrastructure

- **Issue**: Fragile MongoDB configuration and poorly organized environment variables
- **Solution**:
  - Reorganization of environment variables
  - Improvement of MongoDB connection management
- **Reason**: Ensure application stability and security
- **Related commits**: [133de42, 9f0e836]

### 2. Project Management

- **Issue**: Errors in project display and creation
- **Solution**:
  - Fixed undefined errors in project/view.js
  - Enhanced project creation display
  - Fixed project editing functionality
- **Reason**: Improve project management reliability
- **Related commits**: [8281ec3, e3e0f34, 1ef8499]

### 3. User Management

- **Issue**: User list not updating and impossible to edit users
- **Solution**:
  - Real-time update of user list
  - Implementation of user editing
- **Reason**: Enhance user experience
- **Related commits**: [89a48d5, 7ec3b27]

### 4. Activity Management

- **Issue**: Bugs in activity management
- **Solution**:
  - Added unique keys for React
  - Fixed deletion logic
  - Implemented daily conflict verification
- **Reason**: Ensure data consistency
- **Related commits**: [bfb6def, a70926f, c86854c]

### 5. Authentication and Account Management

- **Issue**: Bugs in authentication and account management
- **Solution**:
  - Improved account editing
  - Unique username validation
  - Proper handling of API requests during component unmounting
- **Reason**: Secure and strengthen authentication
- **Related commits**: [9551719, ad10a28, c0c9f87, f8e2b7d]

## Developed Features

### 1. Infrastructure Improvement

- Better MongoDB error handling
- **Objective**: Ensure application stability

### 2. Project and User Management

- Complete CRUD system for projects and users
- **Objective**: Facilitate data management

### 3. Activity System

- Temporal conflict management
- Deletion and update interface
- **Objective**: Improve time management

## Feedback on Code/Architecture

### Positive Points

- Well-designed modular architecture
- Clear frontend/backend separation
- Use of React

### Areas for Improvement

- Need for better error handling
- Lack of unit tests
- Documentation needs enhancement
- Stricter typing recommended

### Encountered Difficulties

- Complex initial configuration
- React state management and component lifecycle
- Frontend/backend data synchronization
- Robust input validation
