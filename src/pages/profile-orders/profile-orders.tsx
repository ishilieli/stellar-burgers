import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getUserOrders, listOfOrders } from '../../slices/user_order';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  const orders: TOrder[] = useSelector(listOfOrders);
  return <ProfileOrdersUI orders={orders} />;
};
