const Description = ({data}) => {
    return (
   <div className="prod-text-conteiner">
      <h2>Alójate en el corazón de {data.city.name}</h2><br/>
      <p>{data.description}</p>
   </div>
    );

};
export default Description;