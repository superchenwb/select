import * as React from 'react';

export default function useSelectTriggerControl(
  elements: (HTMLElement | undefined)[],
  open: boolean,
  triggerOpen: (open: boolean) => void,
) {
  const propsRef = React.useRef(null);
  propsRef.current = {
    elements: elements.filter(e => e),
    open,
    triggerOpen,
  };

  React.useEffect(() => {
    function onGlobalMouseDown(event: any) {
      const target = event.path ? event.path[0] : (event.target as HTMLElement);
      if (
        propsRef.current.open &&
        propsRef.current.elements.every(element => !element.contains(target) && element !== target)
      ) {
        // Should trigger close
        propsRef.current.triggerOpen(false);
      }
    }

    window.addEventListener('mousedown', onGlobalMouseDown);
    return () => window.removeEventListener('mousedown', onGlobalMouseDown);
  }, []);
}
