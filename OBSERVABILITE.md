# Observabilité

L'application expose deux chemins de santé équivalents :

- `/api/health` directement dans le backend;
- `/health` par l'intermédiaire de NGINX.

Une réponse saine retourne le code HTTP `200` et le JSON suivant :

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
