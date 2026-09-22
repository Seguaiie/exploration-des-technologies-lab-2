# Observabilité

L'application expose deux chemins de santé :

- `/api/health` directement dans le backend;
- `/health` par l'intermédiaire de NGINX.

Dans un navigateur, `/health` affiche un tableau de bord adaptatif avec trois
contrôles effectués toutes les 30 secondes : santé de l’API, chargement du
catalogue et conversion réelle de 10 pieds en 3,048 mètres. Un bouton permet une
actualisation immédiate. Chaque requête expire après 8 secondes en cas de silence.
Les échecs réseau ou réponses inattendues apparaissent comme une anomalie.

Le tableau affiche le temps aller-retour de l’API depuis le navigateur, l’heure
du dernier contrôle et les 30 derniers résultats de la session. L’historique est
effacé au rechargement : ce n’est pas une mesure de disponibilité permanente.
La page ne mesure pas indépendamment l’état de NGINX, de la VM ou du certificat.
Si le backend est entièrement arrêté, un nouveau chargement de la page peut
échouer ; une page déjà ouverte affiche les échecs des contrôles suivants.

Le contenu est négocié avec l’en-tête `Accept` : HTML pour le navigateur, JSON
pour `curl` et les sondes. `/api/health?format=json` force le JSON dans le navigateur.
Aucune modification de NGINX n’est nécessaire avec la configuration du dépôt.
Le lien « État des services » se trouve sous le convertisseur.

Une réponse JSON saine retourne le code HTTP `200` et le JSON suivant :

```json
{"status":"ok"}
```

## Vérifier la disponibilité

Après l'activation de HTTPS :

```bash
curl --fail --silent --show-error https://emilmor.com/health
```

## Consulter les journaux

Le backend écrit une ligne JSON pour chaque requête avec la date, la méthode, le
chemin, le code HTTP et la durée. Les journaux sont recueillis par `systemd`.

```bash
sudo journalctl -u emilmor -n 50 --no-pager
sudo journalctl -u emilmor -f
```

État des services :

```bash
systemctl status emilmor nginx
```
