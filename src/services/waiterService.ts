import { apiClient } from "@/lib/axios";
import { FoodItem, FoodCategory } from "@/types/food";
import { 
  AddWaiterRequest, 
  EditWaiterRequest, 
  Waiter, 
  Table, 
  MoveOrderRequest, 
  PartialPaymentRequest 
} from "@/types/waiter";
import { OrderResponse, Order, OrderRequestItem } from "@/types/order";
import { WaiterFoodResponse } from "@/types/waiter/food";

// Fetch all waiters
export const fetchWaiters = async (): Promise<Waiter[]> => {
  const response = await apiClient.get<Waiter[]>("/admin/viewWaiters");
  return response.data;
};

// Add a new waiter
export const addWaiter = async (waiter: AddWaiterRequest): Promise<void> => {
  await apiClient.post("/admin/addWaiter", waiter);
};

// Edit a waiter's details
export const editWaiter = async (id: number, waiter: EditWaiterRequest): Promise<void> => {
  await apiClient.put(`/admin/editWaiter/${id}`, waiter);
};

// Delete a waiter
export const deleteWaiter = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/deleteWaiter/${id}`);
};

// Fetch all tables
export const fetchTables = async (): Promise<Table[]> => {
  const response = await apiClient.get<Table[]>("/waiter/viewTables");
  return response.data;
};

// Fetch occupied tables (tables with active orders)
export const fetchOccupiedTables = async (): Promise<Table[]> => {
  const response = await apiClient.get<Table[]>("/waiter/viewOccupiedTables");
  return response.data;
};

// Fetch the current order for a specific table
export const fetchOrderByTable = async (tableId: number): Promise<Order> => {
  const response = await apiClient.get<OrderResponse>(`/waiter/orders/${tableId}`);
  return response.data.order; // Extract 'order' object
};

// Create or update an order for a table
export const updateOrder = async (tableId: number, items: OrderRequestItem[]): Promise<void> => {
  await apiClient.post(`/waiter/orders/${tableId}`, { items }); // Wrap items in an object
};


// Move an order from one table to another
export const moveOrder = async (request: MoveOrderRequest): Promise<void> => {
  await apiClient.put(`/waiter/move/${request.sourceTableId}/${request.targetTableId}`);
};

// Delete a full order (when payment is completed)
export const payFullOrder = async (tableId: number): Promise<void> => {
  await apiClient.delete(`/waiter/orders/${tableId}`);
};

// Pay for partial order items
export const payPartialOrder = async (tableId: number, items: PartialPaymentRequest[]): Promise<void> => {
  await apiClient.post(`/waiter/orders/${tableId}/items`, { items }); // Use POST for better compatibility
};

// Fetch available foods for waiters
export const fetchFoodsForWaiters = async (): Promise<WaiterFoodResponse> => {
  const response = await apiClient.get<WaiterFoodResponse>("/waiter/orders");
  return response.data;
};
