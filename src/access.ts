import {InitialState} from "@/typings";

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canAdmin: loginUser && loginUser.userAccount === 'admin',
  };
}
