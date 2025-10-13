// screens/hooks/useLocalData.js
import { useEffect, useState } from 'react';
import { getDepartments, getMunicipalities } from '../../api';

// 🔗 Custom Hook for handling local static data
export const useLocalData = (province, district) => {
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const deptData = await getDepartments();
        setDepartments(deptData);

        const provinceData = await getMunicipalities(province);
        if (provinceData?.districts) {
          const selectedDistrict = provinceData.districts.find(
            (d) => d.district.toLowerCase() === district?.toLowerCase()
          );
          setMunicipalities(selectedDistrict?.municipalities || []);
        }
      } catch (err) {
        console.error('Error loading local data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (province) loadData();
  }, [province, district]);

  return { departments, municipalities, loading };
};
