using System;
using System.Collections.Generic;
using System.Linq;
using GeoLib.Contracts;
using GeoLib.Data;
using System.ServiceModel;
using System.Transactions;

namespace GeoLib.Services
{
    public class GeoManager : IGeoService
    {
        public GeoManager()
        {
        }

        public GeoManager(IZipCodeRepository zipCodeRepository)
            : this(zipCodeRepository, null)
        {
        }

        public GeoManager(IStateRepository stateRepository)
            : this(null, stateRepository)
        {
        }

        public GeoManager(IZipCodeRepository zipCodeRepository, IStateRepository stateRepository)
        {
            _ZipCodeRepository = zipCodeRepository;
            _StateRepository = stateRepository;
        }

        IZipCodeRepository _ZipCodeRepository = null;
        IStateRepository _StateRepository = null;

        public ZipCodeData GetZipInfo(string zip)
        {
            ZipCodeData zipCodeData = null;

            IZipCodeRepository zipCodeRepository = _ZipCodeRepository ?? new ZipCodeRepository();

            ZipCode zipCodeEntity = zipCodeRepository.GetByZip(zip);
            if (zipCodeEntity != null)
            {
                zipCodeData = new ZipCodeData()
                {
                    City = zipCodeEntity.City,
                    State = zipCodeEntity.State.Abbreviation,
                    ZipCode = zipCodeEntity.Zip
                };
            }
            else
                throw new FaultException(string.Format("Zip code {0} not found.", zip));

            return zipCodeData;
        }

        public IEnumerable<string> GetStates(bool primaryOnly)
        {
            List<string> stateData = new List<string>();

            IStateRepository stateRepository = _StateRepository ?? new StateRepository();

            IEnumerable<State> states = stateRepository.Get(primaryOnly);
            if (states != null)
            {
                foreach (State state in states)
                    stateData.Add(state.Abbreviation);
            }

            return stateData;
        }

        public IEnumerable<ZipCodeData> GetZips(string state)
        {
            List<ZipCodeData> zipCodeData = new List<ZipCodeData>();

            IZipCodeRepository zipCodeRepository = _ZipCodeRepository ?? new ZipCodeRepository();

            var zips = zipCodeRepository.GetByState(state);
            if (zips != null)
            {
                foreach (ZipCode zipCode in zips)
                {
                    zipCodeData.Add(new ZipCodeData()
                    {
                        City = zipCode.City,
                        State = zipCode.State.Abbreviation,
                        ZipCode = zipCode.Zip
                    });
                }
            }

            return zipCodeData;
        }

        public IEnumerable<ZipCodeData> GetZips(string zip, int range)
        {
            List<ZipCodeData> zipCodeData = new List<ZipCodeData>();

            IZipCodeRepository zipCodeRepository = _ZipCodeRepository ?? new ZipCodeRepository();

            ZipCode zipEntity = zipCodeRepository.GetByZip(zip);
            IEnumerable<ZipCode> zips = zipCodeRepository.GetZipsForRange(zipEntity, range);
            if (zips != null)
            {
                foreach (ZipCode zipCode in zips)
                {
                    zipCodeData.Add(new ZipCodeData()
                    {
                        City = zipCode.City,
                        State = zipCode.State.Abbreviation,
                        ZipCode = zipCode.Zip
                    });
                }
            }

            return zipCodeData;
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        public void UpdateZipCity(string zip, string city)
        {
            IZipCodeRepository zipCodeRepository = _ZipCodeRepository ?? new ZipCodeRepository();

            ZipCode zipEntity = zipCodeRepository.GetByZip(zip);
            if (zipEntity != null)
            {
                zipEntity.City = city;
                zipCodeRepository.Update(zipEntity);
            }
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        //[OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = false)]
        //[OperationBehavior(TransactionScopeRequired = false)]
        public void UpdateZipCity(IEnumerable<ZipCityData> zipCityData)
        {
            IZipCodeRepository zipCodeRepository = _ZipCodeRepository ?? new ZipCodeRepository();

            #region efficient way of handling batch update
            //Dictionary<string, string> cityBatch = new Dictionary<string, string>();
            //
            //foreach (ZipCityData zipCityItem in zipCityData)
            //    cityBatch.Add(zipCityItem.ZipCode, zipCityItem.City);
            //
            //zipCodeRepository.UpdateCityBatch(cityBatch);
            #endregion

            #region more inefficient, but allows for failing part of it
            int counter = 0;

            foreach (ZipCityData zipCityItem in zipCityData)
            {
                counter++;
                //if (counter == 2)
                //    throw new FaultException("Sorry, no can do.");
                ZipCode zipCodeEntity = zipCodeRepository.GetByZip(zipCityItem.ZipCode);
                zipCodeEntity.City = zipCityItem.City;
                ZipCode updatedItem = zipCodeRepository.Update(zipCodeEntity);
            }

            //OperationContext.Current.SetTransactionComplete();
            #endregion
            
            #region manual transaction handling
            //using (TransactionScope scope = new TransactionScope())
            //{
            //    int counter = 0;

            //    foreach (ZipCityData zipCityItem in zipCityData)
            //    {
            //        counter++;
            //        if (counter == 2)
            //            throw new FaultException("Sorry, no can do.");
            //        ZipCode zipCodeEntity = zipCodeRepository.GetByZip(zipCityItem.ZipCode);
            //        zipCodeEntity.City = zipCityItem.City;
            //        ZipCode updatedItem = zipCodeRepository.Update(zipCodeEntity);
            //    }

            //    scope.Complete();
            //}
            #endregion
        }
    }
}
