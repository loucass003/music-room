import { createContext, Reducer, useContext, useEffect, useReducer } from "react";
import { SessionQuery, useSessionLazyQuery, useSetDeviceMutation } from "../graphql/generated-types";
import { v4 as uuidv4 } from 'uuid';


export const SessionContext = createContext<Session>(undefined as any);

export type SessionActions =
  | { type: "session", session?: SessionQuery }
  | { type: "loading", loading: boolean }

export interface ISessionState {
  session?: SessionQuery;
  loading: boolean;
}

export interface DeviceLocal {
  deviceSecret: string;
  deviceName: string;
}

function authReducer(
  state: ISessionState,
  action: SessionActions
): ISessionState {
  switch (action.type) {
    case "session": {
      if (action.session?.session?.deviceId) {

      }
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
    default: {
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
}

export interface Session {
  session: ISessionState;
  updateSession: () => void;
  createDevice: (name: string) => void;
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

  const [setDevice] = useSetDeviceMutation();

  const meCompleted = async (data: SessionQuery) => {
    console.log('completed')
    dispatch({ type: 'session', session: data })
    if (!data.session?.deviceId) {
      const deviceLocalstr = localStorage.getItem('MUSIC_ROOM_DEVICE_LOCAL');
      if (deviceLocalstr) {
        const { deviceName, deviceSecret }: DeviceLocal = JSON.parse(deviceLocalstr);
        if (deviceName && deviceSecret) {
          const { data } = await setDevice({ variables: { deviceName, deviceSecret } })
          if (data?.setDevice) {
            dispatch({ type: 'loading', loading: true })
            querySession()
          }
        }
      }
    }
    dispatch({ type: 'loading', loading: false })
  };
  const [querySession] = useSessionLazyQuery({ onCompleted: meCompleted });

  useEffect(() => {
    querySession()
    
  }, [querySession]);

  return {
    session: state,
    updateSession: () => querySession(),
    createDevice: (name: string) => {
      const device: DeviceLocal = {
        deviceName: name,
        deviceSecret: uuidv4()
      };
      localStorage.setItem('MUSIC_ROOM_DEVICE_LOCAL', JSON.stringify(device));
      dispatch({ type: 'loading', loading: true })
      querySession()
    },
    logout: () => dispatch({ type: 'session', session: undefined }),
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