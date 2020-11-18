import queryString from 'query-string';


const useQueryString = () => {


    return queryString.parse(location.search);

}



export default useQueryString;