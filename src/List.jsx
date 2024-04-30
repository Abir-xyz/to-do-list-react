const List = ({ items, removeItem, editItem }) => {
  const list = items.map((item) => {
    const { id, title } = item;
    return (
      <article className='list-wrapper' key={id}>
        {' '}
        <div className='list'>
          <h3>{title}</h3>
        </div>
        <div className='list-btns'>
          <span className='edit-btn' onClick={() => editItem(id)}>
            <i className='fa-regular fa-pen-to-square'></i>
          </span>
          <span className='del-btn' onClick={() => removeItem(id)}>
            <i className='fa-solid fa-trash'></i>
          </span>
        </div>
      </article>
    );
  });
  return list;
};
export default List;
