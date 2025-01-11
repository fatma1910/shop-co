export interface CategoryProps {
    id: number;
    name: string;
}

export interface ProductData {
    product: {
      id: number;
      title: string;
      rate: string;
      price: string;
      color: string;
      size: string[];
      description: string;
      imagePublicId: string | null;
      imageUrl: string ;
    };
    // category: {
    //   id: number;
    //   name: string;
    // };
    // product_category: {
      
    // };
  }
export interface ProductProps {

      id: number;
      title: string;
      rate: string;
      price: string;
      color: string;
      size: string[];
      description: string;
      imagePublicId: string | null;
      imageUrl: string ;
    
  }

export interface FavoritesContextProps {
  fav: ProductProps[];
  addToFav: (item: ProductProps) => void;
  removeFromFav: (id: number) => void;
}

