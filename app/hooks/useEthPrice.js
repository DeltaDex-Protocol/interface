import { useState, useEffect } from 'react'

const link = "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=3d&limit=100"

const useEthPrice = () => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        const response = await fetch(link);
        return response.json();
    };

    const updateData = () => {
        fetchData().then((_data) => {
            setData(_data.map((el) => {
            return {
              time: new Date(el[0])
                .toLocaleDateString("en-US")
                .split("/")
                .join("-"),
              value: (parseInt(el[1]) + parseInt(el[4])) / 2,
            };
          }));
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    }

    useEffect(() => {
        updateData()
      }, []);

      return [data, updateData]

}

export default useEthPrice;