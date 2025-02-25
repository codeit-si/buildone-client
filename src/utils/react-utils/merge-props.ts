type UnknownProps = Record<string, unknown>;

const mergeProps = (slotProps: UnknownProps, childProps: UnknownProps) => {
  // all child props should override
  const overrideProps = { ...childProps };

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          if (typeof childPropValue === "function") {
            childPropValue(...args);
          }
          if (typeof slotPropValue === "function") {
            slotPropValue(...args);
          }
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (
      propName === "style" &&
      typeof slotPropValue === "object" &&
      typeof childPropValue === "object"
    ) {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
};

export default mergeProps;
