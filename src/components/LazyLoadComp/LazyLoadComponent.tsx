import React from "react";

export default function LazyLoadComponent({ children }: { children: React.ReactNode }) {
  const [inView, setInview] = React.useState(false);

  const lastElement = React.useCallback((node: any) => {
    const observer = new IntersectionObserver((enties, observe) => {
      const isIntersecting = enties[0].isIntersecting;
      if (isIntersecting) {
        setTimeout(() => {
          setInview(true);
          observe.disconnect();
        }, 300)
      }
    }, { threshold: 1 });
    if (node) {
      observer.observe(node);
    }
  }, []);

  return (
    <div ref={lastElement} style={{ marginBottom: inView ? "0px" : "500px" }}>
      {inView && children}
    </div>
  );
}