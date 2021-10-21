import { createContext, Reducer, useContext, useLayoutEffect, useReducer } from "react";
import { SessionQuery, useLogoutMutation, useSessionLazyQuery, useSetDeviceMutation } from "../graphql/generated-types";

export const SessionContext = createContext<Session>(undefined as any);

export type SessionActions =
  | { type: "session", session?: SessionQuery }
  | { type: "loading", loading: boolean }
  | { type: "logout" }

export interface ISessionState {
  session?: SessionQuery;
  loading: boolean;
}

export interface DeviceLocal {
  deviceSecret: string;
  deviceName: string;
}

const initialState: ISessionState = { loading: true }; 

function authReducer(
  state: ISessionState,
  action: SessionActions
): ISessionState {
  switch (action.type) {
    case "session": {
      return {
        ...state,
        session: action.session
      };
    }
    case "loading": {
      return {
        ...state,
        loading: action.loading
      }
    }
    case "logout": {
      return { ...initialState }
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
}

export interface Session {
  session: ISessionState;
  updateSession: () => void;
  createDevice: (device: DeviceLocal) => void;
  logout: () => void;
  isLoggedIn: boolean;
  loading: boolean;
  hasDevice: boolean;
}


export function useProvideSession(): Session {
  const [state, dispatch] = useReducer<Reducer<ISessionState, SessionActions>>(
    authReducer, 
    { loading: true }
  );

  const [setDevice] = useSetDeviceMutation({});
  const [logoutMutation] = useLogoutMutation();

  const meCompleted = async (data: SessionQuery) => {
    dispatch({ type: 'session', session: data })
    if (!data.session?.deviceId) {
      const deviceLocalstr = localStorage.getItem('MUSIC_ROOM_DEVICE_LOCAL');
      if (deviceLocalstr) {
        dispatch({ type: 'loading', loading: true })
        const { deviceName, deviceSecret }: DeviceLocal = JSON.parse(deviceLocalstr);
        if (deviceName && deviceSecret) {
          const { data } = await setDevice({ variables: { deviceName, deviceSecret }})
          if (data?.setDevice) {
            querySession()
          }
        } else
          dispatch({ type: 'loading', loading: false })
      }
    }
    else 
      dispatch({ type: 'loading', loading: false })
  };
  const [querySession] = useSessionLazyQuery({ 
    onCompleted: meCompleted, 
    fetchPolicy: 'network-only', 
    onError: () => { 
      dispatch({ type: 'loading', loading: false }) 
    } 
  });

  useLayoutEffect(() => {
    querySession()
  }, [querySession]);

  return {
    session: state,
    updateSession: () => querySession(),
    createDevice: async (device: DeviceLocal) => {
        localStorage.setItem('MUSIC_ROOM_DEVICE_LOCAL', JSON.stringify(device));
        querySession()
    },
    logout: async () => {
      await logoutMutation();
      dispatch({ type: 'logout' })
      localStorage.removeItem('MUSIC_ROOM_DEVICE_LOCAL');
      querySession()
    },
    isLoggedIn: !!state.session?.me,
    hasDevice: !!state.session?.me && !!state.session.session?.deviceId,
    loading: state.loading,
  };
}

export function useSession(): Session {
  const context = useContext<Session>(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}