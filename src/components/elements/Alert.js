// Alert -- se renderiza una alerta.
// Alert -- an alert is rendered.
const Alert = (
  {
    classAside,
    children
  }) => {
  return (
    <aside className={`aside ${classAside}`}>
      <section className="alert">
        {children}
      </section>
    </aside>
  )
}
export default Alert;