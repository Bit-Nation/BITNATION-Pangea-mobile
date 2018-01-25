export const MAKE_STEP = 'MAKE_STEP';
export const RESET_STEPS = 'RESET_STEPS';

export function makeStep() {
  return {
    type: MAKE_STEP,
  };
}

export function resetSteps() {
  return {
    type: RESET_STEPS,
  };
}