export interface BookType {
  id: string;
  book: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
    };
    price: number;
    createdAt: string;
  };
  isPurchased?: boolean;
};

export interface UserType {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}