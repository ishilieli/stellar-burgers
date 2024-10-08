import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getUserOrders, listOfOrders } from '../../slices/orders_list';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  const orders: TOrder[] = useSelector(listOfOrders);
  console.log(orders);
  return <ProfileOrdersUI orders={orders} />;
};
