import { useReducer } from 'react';

export const actionNames = {
  toggleAgreementAllowed: 'toggleAgreementAllowed',
  togglePrivacyPolicyAllowed: 'togglePolicyAllowed',
  toggleMarketingAllowedOptional: 'toggleMarketingAllowedOptional',
  toggleAllAllowed: 'toggleAllAllowed',
};

const init = {
  isAllAllowed: false,
  isAgreementAllowed: false,
  isPrivacyPolicyAllowed: false,
  isMarketingAllowedOptional: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionNames.toggleAgreementAllowed:
      return { ...state, isAgreementAllowed: !state.isAgreementAllowed };

    case actionNames.togglePrivacyPolicyAllowed:
      return {
        ...state,
        isPrivacyPolicyAllowed: !state.isPrivacyPolicyAllowed,
      };

    case actionNames.toggleMarketingAllowedOptional:
      return {
        ...state,
        isMarketingAllowedOptional: !state.isMarketingAllowedOptional,
      };

    case actionNames.toggleAllAllowed:
      const res = !state.isAllAllowed;
      return {
        isAgreementAllowed: res,
        isPrivacyPolicyAllowed: res,
        isMarketingAllowedOptional: res,
        isAllAllowed: res,
      };

    default:
      return state;
  }
};

export const usePolicyReducer = () => {
  const [state, dispatch] = useReducer(reducer, init);
  return [state, dispatch];
};
