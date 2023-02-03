using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using GeoLib.Business.Contracts;
using GeoLib.Business.Entities;
using GeoLib.Common.Contracts;
using GeoLib.Data;
using System.Threading;

namespace GeoLib.Business.Managers
{
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Reentrant, ReleaseServiceInstanceOnTransactionComplete = false)]
    public class GeoManager : IGeoService, IGeoAdminService
    {
        public GeoManager(IZipCodeRepository zipCodeRepository, 
            IStateRepository stateRepository)
        {
            _ZipCodeRepository = zipCodeRepository;
            _StateRepository = stateRepository;
        }

        IZipCodeRepository _ZipCodeRepository = null;
        IStateRepository _StateRepository = null;

        public ZipCode GetZipInfo(string zip)
        {
            ZipCode zipCodeEntity = _ZipCodeRepository.GetByZip(zip);

            return zipCodeEntity;
        }

        public IEnumerable<string> GetStates(bool primaryOnly)
        {
            List<string> stateData = new List<string>();

            IEnumerable<State> states = _StateRepository.Get(primaryOnly);
            if (states != null)
            {
                foreach (State state in states)
                    stateData.Add(state.Abbreviation);
            }

            return stateData;
        }

        public IEnumerable<ZipCode> GetZips(string state)
        {
            IEnumerable<ZipCode> zips = _ZipCodeRepository.GetByState(state);

            return zips;
        }

        public IEnumerable<ZipCode> GetZips(string zip, int range)
        {
            ZipCode zipEntity = _ZipCodeRepository.GetByZip(zip);
            IEnumerable<ZipCode> zips = _ZipCodeRepository.GetZipsForRange(zipEntity, range);

            return zips;
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        public void UpdateZipCity(string zip, string city)
        {
            ZipCode zipEntity = _ZipCodeRepository.GetByZip(zip);
            if (zipEntity != null)
            {
                zipEntity.City = city;
                _ZipCodeRepository.Update(zipEntity);
            }
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        public int UpdateZipCity(IEnumerable<ZipCityData> zipCityData)
        {
            int cnt = 0;

            foreach (ZipCityData zipCityItem in zipCityData)
            {
                cnt++;

                ZipCode zipCodeEntity = _ZipCodeRepository.GetByZip(zipCityItem.ZipCode);
                zipCodeEntity.City = zipCityItem.City;
                ZipCode updatedItem = _ZipCodeRepository.Update(zipCodeEntity);

                IUpdateZipCallback callback = OperationContext.Current.GetCallbackChannel<IUpdateZipCallback>();
                if (callback != null)
                    callback.ZipUpdated(zipCityItem);
            }

            return cnt;

        }
    }
}
