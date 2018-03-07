using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using GeoLib.Contracts;

namespace GeoLib.Proxies
{
    public class GeoClient : ClientBase<IGeoService>, IGeoService
    {
        public GeoClient()
        {            
        }

        public GeoClient(string endpointName)
            : base(endpointName)
        {            
        }

        public GeoClient(Binding binding, EndpointAddress address)
            : base(binding, address)
        {            
        }

        public ZipCodeData GetZipInfo(string zip)
        {
            return Channel.GetZipInfo(zip);
        }

        public IEnumerable<string> GetStates(bool primaryOnly)
        {
            return Channel.GetStates(primaryOnly);
        }

        public IEnumerable<ZipCodeData> GetZips(string state)
        {
            return Channel.GetZips(state);
        }

        public IEnumerable<ZipCodeData> GetZips(string zip, int range)
        {
            return Channel.GetZips(zip, range);
        }

        public void UpdateZipCity(string zip, string city)
        {
            Channel.UpdateZipCity(zip, city);
        }

        public void UpdateZipCity(IEnumerable<ZipCityData> zipCityData)
        {
            Channel.UpdateZipCity(zipCityData);
        }
    }
}
