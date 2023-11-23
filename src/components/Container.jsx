
const Container = (props) => {
  return (
    // eslint-disable-next-line react/prop-types
    <section className={props.class1}>
        <div className="container-fluid">
            {/*  eslint-disable-next-line react/prop-types */}
            {props.children}
        </div>
    </section>
  )
}

export default Container