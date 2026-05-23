import { useState, type MouseEvent } from 'react';
import {
  Box,
  Notification,
  type AnchorExtendedProps,
} from 'grommet';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';
import { type Miracle } from '../data/types';

type Props = {
  miracle: Miracle;
}

export const MiracleNotification = ({ miracle }: Props ) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);
  // Notifications are to let users know if there is any missing context, like a part 1
  let notificationActions: AnchorExtendedProps[] = [];
  let hasNotification = false;
  if (!isEmpty(miracle.notification)) {
    hasNotification = true;
    miracle.notification.actions.map(action => {
      const { endpoint, label, path } = action;
      const modifiedAction = {
        label,
        href: endpoint,
        onClick: (event: MouseEvent<HTMLAnchorElement>) => {
          // Cannot pass react-router Link, state, to here
          // ...due to issue with Grommet
          event?.preventDefault();
          navigate(endpoint, { state: { path }})
        }
      }
      notificationActions = [...notificationActions, modifiedAction]
    })
  }

  if (hasNotification === false || showNotification === false) {
    return null;
  }

  return (
    <Box margin={{ bottom: 'medium' }}>
      <Notification
        status="info"
        title={miracle.notification.title}
        message={miracle.notification.message}
        actions={notificationActions}
        onClose={() => setShowNotification(false)}
      />
    </Box>
  )
}