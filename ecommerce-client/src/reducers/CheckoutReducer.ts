export type CheckoutAction = {
    type: CheckoutActionType,
    payload: number;
}

export enum CheckoutActionType {
    CHANGE_STAGE
}

export const CheckoutReducer = (checkoutStage: number, action: CheckoutAction): number => {
    if (action.type === CheckoutActionType.CHANGE_STAGE) {
        return action.payload;
    }

    return checkoutStage;
}