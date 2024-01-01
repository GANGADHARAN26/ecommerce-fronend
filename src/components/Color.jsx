const Color = (props) => {
  // eslint-disable-next-line react/prop-types
  const {colorData,setColor}=props
  return (
    <>
      <ul className="colors ps-0">
        {
          // eslint-disable-next-line react/prop-types
          colorData && colorData?.map((item,index)=>{
            return (
              <li onClick={()=>setColor(item?._id)} style={{backgroundColor:item?.title}} key={index}></li>
            )
          })
        }
        
      </ul>
    </>
  );
};

export default Color;
