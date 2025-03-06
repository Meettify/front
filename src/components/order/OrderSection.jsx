const OrderSection = ({title, content}) => {
    return(
        <>
            <div className="order-info-area">
                <h2 className="page-title">{title}</h2>
                <div className="order-info">
                    {content}
                </div>
            </div>
        </>
    )
}

export default OrderSection;