export type ReviewType = {
  id: string;
  user: {
    id: string;
    userName: string;
  };
  difficulty: number;
  description: string;
  createdAt?: string;
};

export type ReviewFormType = {
  monsterId: string;
  name: string;
  image: string;
};

