import { FavoriteService } from '../services/favorite.service';

export function initApp(favoriteService: FavoriteService) {
    return () => favoriteService.loadFavorites();
}