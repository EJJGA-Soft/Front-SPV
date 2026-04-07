import { Producto } from "../../interfaces/Inventario/producto_interface";
import { ICategoria } from "../../interfaces/Inventario/categoria_interface";
import { IProveedores } from "../../interfaces/Proveedores/proveedor_interface";
import { IAccount } from "../../interfaces/newAccount._interface";
import { StatusUser } from "../../enum/enum";

// ==================== FLAG DE MODO MOCK ====================
export const MOCK_MODE = true; // Cambiar a false para usar API real

// ==================== CATEGORÍAS ====================
export const MOCK_CATEGORIES: ICategoria[] = [
  {
    id: 1,
    nombre: "Abarrotes Básicos",
    esBorrado: false,
  },
  {
    id: 2,
    nombre: "Bebidas",
    esBorrado: false,
  },
  {
    id: 3,
    nombre: "Lácteos",
    esBorrado: false,
  },
  {
    id: 4,
    nombre: "Snacks",
    esBorrado: false,
  },
  {
    id: 5,
    nombre: "Productos de Limpieza",
    esBorrado: false,
  },
];

// ==================== PROVEEDORES ====================
export const MOCK_PROVIDERS: IProveedores[] = [
  {
    id: "prov-001",
    nombreEmpresa: "Distribuidora Central",
    numeroCelular: "+34 600 123 456",
    esBorrado: false,
    stockTotal: 500,
  },
  {
    id: "prov-002",
    nombreEmpresa: "Productos Frescos S.A.",
    numeroCelular: "+34 600 789 012",
    esBorrado: false,
    stockTotal: 300,
  },
  {
    id: "prov-003",
    nombreEmpresa: "Bebidas Premium",
    numeroCelular: "+34 600 345 678",
    esBorrado: false,
    stockTotal: 200,
  },
];

// ==================== PRODUCTOS ====================
export const MOCK_PRODUCTS: Producto[] = [
  {
    id: 1,
    nombre: "Arroz Integral 1kg",
    precio: 2.5,
    stock: 150,
    urlImagen: "https://placehold.co/200x200/E8F5E9/2E7D32?text=Arroz",
    Imagen: new Blob(),
    categoriaId: 1,
    proveedorId: 1,
    esBorrado: false,
    nombreCategoria: "Abarrotes Básicos",
    nombreProveedor: "Distribuidora Central",
  },
  {
    id: 2,
    nombre: "Aceite de Oliva 500ml",
    precio: 4.8,
    stock: 80,
    urlImagen: "https://placehold.co/200x200/FFF8DC/D4A017?text=Aceite",
    Imagen: new Blob(),
    categoriaId: 1,
    proveedorId: 1,
    esBorrado: false,
    nombreCategoria: "Abarrotes Básicos",
    nombreProveedor: "Distribuidora Central",
  },
  {
    id: 3,
    nombre: "Leche Entera 1L",
    precio: 1.2,
    stock: 200,
    urlImagen: "https://placehold.co/200x200/F8F9FA/4472CA?text=Leche",
    Imagen: new Blob(),
    categoriaId: 3,
    proveedorId: 2,
    esBorrado: false,
    nombreCategoria: "Lácteos",
    nombreProveedor: "Productos Frescos S.A.",
  },
  {
    id: 4,
    nombre: "Yogur Natural 500g",
    precio: 2.3,
    stock: 120,
    urlImagen: "https://placehold.co/200x200/FFF0F5/FF69B4?text=Yogur",
    Imagen: new Blob(),
    categoriaId: 3,
    proveedorId: 2,
    esBorrado: false,
    nombreCategoria: "Lácteos",
    nombreProveedor: "Productos Frescos S.A.",
  },
  {
    id: 5,
    nombre: "Refresco Cola 2L",
    precio: 2.0,
    stock: 180,
    urlImagen: "https://placehold.co/200x200/331C00/FF8C00?text=Cola",
    Imagen: new Blob(),
    categoriaId: 2,
    proveedorId: 3,
    esBorrado: false,
    nombreCategoria: "Bebidas",
    nombreProveedor: "Bebidas Premium",
  },
  {
    id: 6,
    nombre: "Agua Mineral 6x500ml",
    precio: 1.8,
    stock: 250,
    urlImagen: "https://placehold.co/200x200/E0F2F1/00897B?text=Agua",
    Imagen: new Blob(),
    categoriaId: 2,
    proveedorId: 3,
    esBorrado: false,
    nombreCategoria: "Bebidas",
    nombreProveedor: "Bebidas Premium",
  },
  {
    id: 7,
    nombre: "Papitas Fritas 100g",
    precio: 1.2,
    stock: 300,
    urlImagen: "https://placehold.co/200x200/FFF5EE/FF4500?text=Papitas",
    Imagen: new Blob(),
    categoriaId: 4,
    proveedorId: 1,
    esBorrado: false,
    nombreCategoria: "Snacks",
    nombreProveedor: "Distribuidora Central",
  },
  {
    id: 8,
    nombre: "Detergente Líquido 1L",
    precio: 3.5,
    stock: 90,
    urlImagen: "https://placehold.co/200x200/FFF9E6/FFD700?text=Detergente",
    Imagen: new Blob(),
    categoriaId: 5,
    proveedorId: 1,
    esBorrado: false,
    nombreCategoria: "Productos de Limpieza",
    nombreProveedor: "Distribuidora Central",
  },
];

// ==================== USUARIOS ====================
export interface MockUser extends IAccount {
  password: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "mock-admin-001",
    name: "Admin Demo",
    email: "admin@demo.com",
    password: "demo123",
    rol: "admin",
    estatusUsuario: StatusUser.ACTIVO,
    isDeleted: false,
  },
  {
    id: "mock-vendedor-001",
    name: "Vendedor Demo",
    email: "vendedor@demo.com",
    password: "demo123",
    rol: "vendedor",
    estatusUsuario: StatusUser.ACTIVO,
    isDeleted: false,
  },
  {
    id: "mock-almacen-001",
    name: "Almacén Demo",
    email: "almacen@demo.com",
    password: "demo123",
    rol: "almacenero",
    estatusUsuario: StatusUser.ACTIVO,
    isDeleted: false,
  },
  {
    id: "mock-gerente-001",
    name: "Gerente Demo",
    email: "gerente@demo.com",
    password: "demo123",
    rol: "gerente",
    estatusUsuario: StatusUser.ACTIVO,
    isDeleted: false,
  },
];

// ==================== NOTIFICACIONES ====================
export interface MockNotification {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
}

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: "notif-001",
    userName: "Sistema",
    message: "Bienvenido a la aplicación demo",
    timestamp: new Date().toISOString(),
    type: "success",
  },
  {
    id: "notif-002",
    userName: "Sistema",
    message: "Stock bajo en Arroz Integral",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "warning",
  },
  {
    id: "notif-003",
    userName: "Gerente",
    message: "Nuevo proveedor registrado",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: "info",
  },
];

// ==================== VENTAS ====================
export interface IVenta {
  id: number;
  fechaRegistro: string;
  tipoPago: number;
  pago: number;
  usuarioId: string;
}

export interface IVentaProducto {
  id: number;
  precioUnitario: number;
  stockVendido: number;
  productoId: number;
  ventaId: number;
  esBorrado: boolean;
}

export const MOCK_VENTAS: IVenta[] = [
  {
    id: 1,
    fechaRegistro: new Date(Date.now() - 86400000).toISOString(),
    tipoPago: 1, // 1 = Efectivo, 2 = Tarjeta
    pago: 28.5,
    usuarioId: "mock-vendedor-001",
  },
  {
    id: 2,
    fechaRegistro: new Date(Date.now() - 172800000).toISOString(),
    tipoPago: 2,
    pago: 45.6,
    usuarioId: "mock-vendedor-001",
  },
  {
    id: 3,
    fechaRegistro: new Date(Date.now() - 259200000).toISOString(),
    tipoPago: 1,
    pago: 15.8,
    usuarioId: "mock-almacen-001",
  },
  {
    id: 4,
    fechaRegistro: new Date(Date.now() - 345600000).toISOString(),
    tipoPago: 2,
    pago: 52.3,
    usuarioId: "mock-vendedor-001",
  },
  {
    id: 5,
    fechaRegistro: new Date(Date.now() - 432000000).toISOString(),
    tipoPago: 1,
    pago: 34.2,
    usuarioId: "mock-gerente-001",
  },
];

export const MOCK_VENTA_PRODUCTOS: IVentaProducto[] = [
  {
    id: 1,
    precioUnitario: 2.5,
    stockVendido: 3,
    productoId: 1,
    ventaId: 1,
    esBorrado: false,
  },
  {
    id: 2,
    precioUnitario: 2.0,
    stockVendido: 2,
    productoId: 5,
    ventaId: 1,
    esBorrado: false,
  },
  {
    id: 3,
    precioUnitario: 1.2,
    stockVendido: 5,
    productoId: 3,
    ventaId: 2,
    esBorrado: false,
  },
  {
    id: 4,
    precioUnitario: 4.8,
    stockVendido: 1,
    productoId: 2,
    ventaId: 2,
    esBorrado: false,
  },
  {
    id: 5,
    precioUnitario: 1.8,
    stockVendido: 4,
    productoId: 6,
    ventaId: 3,
    esBorrado: false,
  },
  {
    id: 6,
    precioUnitario: 2.3,
    stockVendido: 2,
    productoId: 4,
    ventaId: 4,
    esBorrado: false,
  },
  {
    id: 7,
    precioUnitario: 1.2,
    stockVendido: 6,
    productoId: 7,
    ventaId: 4,
    esBorrado: false,
  },
  {
    id: 8,
    precioUnitario: 3.5,
    stockVendido: 1,
    productoId: 8,
    ventaId: 5,
    esBorrado: false,
  },
  {
    id: 9,
    precioUnitario: 2.5,
    stockVendido: 2,
    productoId: 1,
    ventaId: 5,
    esBorrado: false,
  },
];

// ==================== FUNCIONES HELPER ====================
export const getMockProductById = (id: number): Producto | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};

export const getMockProductsByCategory = (categoryId: number): Producto[] => {
  return MOCK_PRODUCTS.filter(
    (p) => p.categoriaId === categoryId && !p.esBorrado,
  );
};

export const getMockCategoryById = (id: number): ICategoria | undefined => {
  return MOCK_CATEGORIES.find((c) => c.id === id);
};

export const getMockProviderById = (id: string): IProveedores | undefined => {
  return MOCK_PROVIDERS.find((p) => p.id === id);
};

export const getMockUserByEmail = (email: string): MockUser | undefined => {
  return MOCK_USERS.find((user) => user.email === email);
};

export const getMockUserById = (id: string): MockUser | undefined => {
  return MOCK_USERS.find((user) => user.id === id);
};

export const getMockVentaById = (id: number): IVenta | undefined => {
  return MOCK_VENTAS.find((v) => v.id === id);
};

export const getMockVentaProductosByVentaId = (
  ventaId: number,
): IVentaProducto[] => {
  return MOCK_VENTA_PRODUCTOS.filter(
    (vp) => vp.ventaId === ventaId && !vp.esBorrado,
  );
};
