using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Threading.Tasks;
using GeoLib.Client.Contracts;
using GeoLib.Common.Contracts;

namespace GeoLib.Proxies
{
    public class GeoAdminClient : ClientBase<IGeoAdminService>, IGeoAdminService
    {
        public GeoAdminClient(InstanceContext instanceContext)
            : base(instanceContext)
        {
        }

        public GeoAdminClient(InstanceContext instanceContext, string endpointName)
            : base(instanceContext, endpointName)
        {
        }

        public GeoAdminClient(InstanceContext instanceContext, Binding binding, EndpointAddress address)
            : base(instanceContext, binding, address)
        {
        }

        public void UpdateZipCity(string zip, string city)
        {
            Channel.UpdateZipCity(zip, city);
        }

        public int UpdateZipCity(IEnumerable<ZipCityData> zipCityData)
        {
            return Channel.UpdateZipCity(zipCityData);
        }

        public Task<int> UpdateZipCityAsync(IEnumerable<ZipCityData> zipCityData)
        {
            return Channel.UpdateZipCityAsync(zipCityData);
        }
    }
}
