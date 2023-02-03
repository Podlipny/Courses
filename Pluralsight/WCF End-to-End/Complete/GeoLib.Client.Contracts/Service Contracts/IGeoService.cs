using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using GeoLib.Client.Entities;
using GeoLib.Common.Contracts;

namespace GeoLib.Client.Contracts
{
    [ServiceContract]
    public interface IGeoService
    {
        [OperationContract]
        ZipCode GetZipInfo(string zip);

        [OperationContract]
        IEnumerable<string> GetStates(bool primaryOnly);

        [OperationContract(Name = "GetZipsByState")]
        IEnumerable<ZipCode> GetZips(string state);

        [OperationContract(Name = "GetZipsForRange")]
        IEnumerable<ZipCode> GetZips(string zip, int range);
    }
}