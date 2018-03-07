using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace GeoLib.Common.Contracts
{
    [ServiceContract]
    public interface IUpdateZipCallback
    {
        [OperationContract(IsOneWay = false)]
        void ZipUpdated(ZipCityData zipCityData);
    }
}
