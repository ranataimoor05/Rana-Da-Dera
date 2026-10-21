import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStageType, PaymentStatusType, CartItem, FulfillmentType, DeliveryDetails, PickupDetails, PaymentMethodType } from '../types/order';
import { Reservation, ReservationStatus } from '../types/reservation';
import { storage } from '../utils/storage';

interface PlaceOrderParams {
  fulfillmentType: FulfillmentType;
  deliveryDetails?: DeliveryDetails;
  pickupDetails?: PickupDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethodType;
  simulatePaymentFailure?: boolean;
}

interface PlaceReservationParams {
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guestCount: number;
  occasion: 'regular' | 'birthday' | 'anniversary' | 'business' | 'family_gathering';
  seatingPreference: 'indoor_royal' | 'outdoor_courtyard' | 'private_dining' | 'no_preference';
  specialRequests?: string;
}

interface OrderContextType {
  orders: Order[];
  reservations: Reservation[];
  currentOrder: Order | null;
  lastPaymentError: string | null;
  placeOrder: (params: PlaceOrderParams) => Promise<{ success: boolean; order?: Order; error?: string }>;
  retryOrderPayment: (orderId: string, paymentMethod: PaymentMethodType) => Promise<boolean>;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStage: OrderStageType) => void;
  createReservation: (params: PlaceReservationParams) => Promise<Reservation>;
  updateReservationStatus: (reservationId: string, status: ReservationStatus) => void;
  clearPaymentError: () => void;
}

const initialOrders: Order[] = [
  {
    id: 'RDD-58210',
    createdAt: '2026-10-18T13:30:00Z',
    fulfillmentType: 'delivery',
    deliveryDetails: {
      fullName: 'Rana Taimoor',
      phone: '0301-4431520',
      addressLine: 'House 14, Street 3, Sector 1',
      zoneId: 'naseerabad',
      zoneName: 'Naseerabad (Local Dera Area)',
      city: 'Rawalpindi',
      landmark: 'Near Dera Chowk',
      deliveryNotes: 'Please ring bell twice.'
    },
    items: [
      {
        cartItemId: 'item-1',
        dishId: 'mutton-karahi',
        nameEn: 'Mutton Karahi',
        nameUr: 'مٹن کڑاہی دیسی گھی',
        basePrice: 2200,
        finalUnitPrice: 2200,
        quantity: 1,
        image: '/images/mutton-karahi.jpg',
        selectedOptions: [{ groupId: 'portion-size', groupTitleEn: 'Portion Size', optionId: 'half-kg', optionNameEn: 'Half KG (Standard)', priceDelta: 0 }]
      },
      {
        cartItemId: 'item-2',
        dishId: 'roghni-naan',
        nameEn: 'Roghni Naan Basket (3 Pcs)',
        nameUr: 'روغنی نان ٹوکری (3 عدد)',
        basePrice: 250,
        finalUnitPrice: 250,
        quantity: 2,
        image: '/images/roghni-naan.jpg',
        selectedOptions: []
      }
    ],
    pricing: {
      subtotal: 2700,
      discount: 200,
      couponCode: 'FIRSTORDER',
      deliveryFee: 0,
      tax: 0,
      total: 2500
    },
    paymentMethod: 'cod',
    paymentStatus: 'successful',
    currentStage: 'completed',
    estimatedTime: 'Delivered',
    isDemoOrder: true,
    history: [
      { stage: 'received', timestamp: '2026-10-18 13:30', note: 'Order placed via online portal' },
      { stage: 'confirmed', timestamp: '2026-10-18 13:32', note: 'Kitchen accepted order' },
      { stage: 'preparing', timestamp: '2026-10-18 13:35', note: 'Desi wok sizzling in iron karahi' },
      { stage: 'out_for_delivery', timestamp: '2026-10-18 13:55', note: 'Dispatched with hot thermal box' },
      { stage: 'completed', timestamp: '2026-10-18 14:15', note: 'Delivered in Naseerabad' }
    ]
  }
];

const initialReservations: Reservation[] = [
  {
    id: 'RES-4912',
    customerName: 'Chaudhry Kamran',
    phone: '0301-4431520',
    email: 'kamran@example.com',
    date: '2026-10-22',
    time: '20:30',
    guestCount: 6,
    occasion: 'family_gathering',
    seatingPreference: 'indoor_royal',
    specialRequests: 'Arrange high chair for toddler please.',
    status: 'confirmed',
    createdAt: '2026-10-18T10:00:00Z',
    isDemoBooking: true
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    return storage.get<Order[]>('orders_history', initialOrders);
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    return storage.get<Reservation[]>('reservations_history', initialReservations);
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [lastPaymentError, setLastPaymentError] = useState<string | null>(null);

  useEffect(() => {
    storage.set('orders_history', orders);
  }, [orders]);

  useEffect(() => {
    storage.set('reservations_history', reservations);
  }, [reservations]);

  const placeOrder = async ({
    fulfillmentType,
    deliveryDetails,
    pickupDetails,
    items,
    subtotal,
    discount,
    couponCode,
    deliveryFee,
    tax,
    total,
    paymentMethod,
    simulatePaymentFailure = false
  }: PlaceOrderParams): Promise<{ success: boolean; order?: Order; error?: string }> => {
    setLastPaymentError(null);

    // Simulate Payment Gateway Failure test scenario
    if (simulatePaymentFailure) {
      const errorMsg = 'Card authorization failed: Issuer bank declined test transaction. Please retry or choose Cash on Delivery.';
      setLastPaymentError(errorMsg);
      return { success: false, error: errorMsg };
    }

    const newOrderId = `RDD-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowStr = new Date().toISOString();

    const newOrder: Order = {
      id: newOrderId,
      createdAt: nowStr,
      fulfillmentType,
      deliveryDetails,
      pickupDetails,
      items,
      pricing: {
        subtotal,
        discount,
        couponCode,
        deliveryFee,
        tax,
        total
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'successful',
      currentStage: 'received',
      estimatedTime: fulfillmentType === 'delivery' ? '25–35 Mins' : '20 Mins',
      isDemoOrder: true,
      history: [
        {
          stage: 'received',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: 'Demo order successfully registered in Naseerabad order queue'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);

    return { success: true, order: newOrder };
  };

  const retryOrderPayment = async (orderId: string, paymentMethod: PaymentMethodType): Promise<boolean> => {
    setLastPaymentError(null);
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentMethod,
            paymentStatus: 'successful',
            history: [
              ...ord.history,
              {
                stage: ord.currentStage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                note: `Payment successfully recovered via ${paymentMethod.toUpperCase()}`
              }
            ]
          };
        }
        return ord;
      })
    );
    return true;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  const updateOrderStatus = (orderId: string, newStage: OrderStageType) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            currentStage: newStage,
            history: [
              ...ord.history,
              {
                stage: newStage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                note: `Status updated to ${newStage.replace(/_/g, ' ')}`
              }
            ]
          };
        }
        return ord;
      })
    );
  };

  const createReservation = async (params: PlaceReservationParams): Promise<Reservation> => {
    const newReservation: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      ...params,
      status: 'pending',
      createdAt: new Date().toISOString(),
      isDemoBooking: true
    };

    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (reservationId: string, status: ReservationStatus) => {
    setReservations(prev =>
      prev.map(r => (r.id === reservationId ? { ...r, status } : r))
    );
  };

  const clearPaymentError = () => {
    setLastPaymentError(null);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        reservations,
        currentOrder,
        lastPaymentError,
        placeOrder,
        retryOrderPayment,
        getOrderById,
        updateOrderStatus,
        createReservation,
        updateReservationStatus,
        clearPaymentError
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
