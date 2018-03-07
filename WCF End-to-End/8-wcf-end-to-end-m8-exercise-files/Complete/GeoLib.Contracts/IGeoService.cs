using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;

namespace GeoLib.Contracts
{
    //[ServiceContract(Namespace = "http://www.pluralsight.com/MiguelCastro/WcfEndToEnd")]
    [ServiceContract]
    public interface IGeoService
    {
        [OperationContract]
        ZipCodeData GetZipInfo(string zip);

        [OperationContract]
        IEnumerable<string> GetStates(bool primaryOnly);

        [OperationContract(Name = "GetZipsByState")]
        IEnumerable<ZipCodeData> GetZips(string state);

        [OperationContract(Name = "GetZipsForRange")]
        IEnumerable<ZipCodeData> GetZips(string zip, int range);
    }
}
