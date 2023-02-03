using System;
using System.Collections.Generic;
using System.Linq;
using GeoLib.Core;

namespace GeoLib.Client.Entities
{
    public class ZipCode : ObjectBase
    {
        int _ZipCodeId;
        string _City;
        int _StateId;
        string _Zip;
        string _County;
        int _AreaCode;
        int _Fips;
        string _TimeZone;
        bool _ObservesDST;
        double _Latitude;
        double _Longitude;
        State _State;

        public int ZipCodeId
        {
            get { return _ZipCodeId; }
            set
            {
                if (_ZipCodeId != value)
                {
                    _ZipCodeId = value;
                    OnPropertyChanged();
                }
            }
        }

        public string City
        {
            get { return _City; }
            set
            {
                if (_City != value)
                {
                    _City = value;
                    OnPropertyChanged();
                }
            }
        }

        public int StateId
        {
            get { return _StateId; }
            set
            {
                if (_StateId != value)
                {
                    _StateId = value;
                    OnPropertyChanged();
                }
            }
        }

        public string Zip
        {
            get { return _Zip; }
            set
            {
                if (_Zip != value)
                {
                    _Zip = value;
                    OnPropertyChanged();
                }
            }
        }

        public string County
        {
            get { return _County; }
            set
            {
                if (_County != value)
                {
                    _County = value;
                    OnPropertyChanged();
                }
            }
        }

        public int AreaCode
        {
            get { return _AreaCode; }
            set
            {
                if (_AreaCode != value)
                {
                    _AreaCode = value;
                    OnPropertyChanged();
                }
            }
        }

        public int Fips
        {
            get { return _Fips; }
            set
            {
                if (_Fips != value)
                {
                    _Fips = value;
                    OnPropertyChanged();
                }
            }
        }

        public string TimeZone
        {
            get { return _TimeZone; }
            set
            {
                if (_TimeZone != value)
                {
                    _TimeZone = value;
                    OnPropertyChanged();
                }
            }
        }

        public bool ObservesDST
        {
            get { return _ObservesDST; }
            set
            {
                if (_ObservesDST != value)
                {
                    _ObservesDST = value;
                    OnPropertyChanged();
                }
            }
        }

        public double Latitude
        {
            get { return _Latitude; }
            set
            {
                if (_Latitude != value)
                {
                    _Latitude = value;
                    OnPropertyChanged();
                }
            }
        }

        public double Longitude
        {
            get { return _Longitude; }
            set
            {
                if (_Longitude != value)
                {
                    _Longitude = value;
                    OnPropertyChanged();
                }
            }
        }
        
        public State State
        {
            get { return _State; }
            set
            {
                _State = value;
                OnPropertyChanged();
            }
        }
    }
}
