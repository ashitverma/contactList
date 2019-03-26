function selectContact(contact) {
  return {
    type: 'CONTACT_SELECTED',
    payload: contact
  }
}
export default selectContact;

export const fetchContactList = () => ({
  type: FETCH_PRODUCTS_BEGIN
});


export function fetchContacts() {
  console.log('qweqwe')
  //return dispatch => {
    //dispatch(fetchContactList());
    return fetch("https://jsonplaceholder.typicode.com/users")
      //.then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log('qwert', json)
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
  //    .catch(error => dispatch(fetchProductsFailure(error)));
  //};
}