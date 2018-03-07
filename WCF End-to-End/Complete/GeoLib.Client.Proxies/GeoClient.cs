using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using GeoLib.Client.Contracts;
using GeoLib.Client.Entities;

namespace GeoLib.Client.Proxies
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

        public ZipCode GetZipInfo(string zip)
        {
            return Channel.GetZipInfo(zip);
        }

        public IEnumerable<string> GetStates(bool primaryOnly)
        {
            return Channel.GetStates(primaryOnly);
        }

        public IEnumerable<ZipCode> GetZips(string state)
        {
            return Channel.GetZips(state);
        }

        public IEnumerable<ZipCode> GetZips(string zip, int range)
        {
            return Channel.GetZips(zip, range);
        }
    }
}