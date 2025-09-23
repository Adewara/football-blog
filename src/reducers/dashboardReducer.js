export const initialState = {
  posts: [], // always synced from Firestore
  activePost: null, // no default selected post
  modal: null, // "delete" | "edit" | "create" | "logout" | null
};

export function dashboardReducer(state, action) {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };

    case "SET_ACTIVE_POST":
      return { ...state, activePost: action.payload };

    case "OPEN_MODAL":
      return { ...state, modal: action.payload };

    case "CLOSE_MODAL":
      return { ...state, modal: null };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== state.activePost?.id),
        activePost: null,
        modal: null,
      };

    case "SAVE_POST":
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        activePost: action.payload,
        modal: null,
      };

    // case "CREATE_POST":
    //   return {
    //     ...state,
    //     posts: [action.payload, ...state.posts],
    //     activePost: action.payload,
    //     modal: null,
    //   };

    default:
      return state;
  }
}
