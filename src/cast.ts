type User = {
  id: number;
  name: string;
  age?: number;
}
type AdminUser = User & {
  level: 1 | 2 | 3;
};

const yamada: User = {
  id: 1,
  name: 'Yamada'
};

// NG
// const yamada2: User = {
//   id: 1,
//   name: 'Yamada',
//   randomProperty: 1
// };

// こっちはOK
const yamada2 = {
  id: 1,
  name: 'Yamada',
  randomProperty: 1
} as User;

// ダウンキャストはNG
// const admin: AdminUser = yamada2;

// アップキャストはOK
const admin: AdminUser = {
  id: 1,
  name: 'Yamada',
  level: 1
};
const yamada3: User = admin;

