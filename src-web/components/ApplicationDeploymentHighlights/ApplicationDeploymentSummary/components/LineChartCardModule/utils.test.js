/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import msgs from '../../../../../../nls/platform.properties';
import { getChartKeyColor, getChartKeyName, getModuleData } from './utils';

describe('getChartKeyColor', () => {
  const value1 = 'pr';
  const value2 = 'fl';
  const value3 = 'cm';

  it('should return #5A6872', () => {
    const result = '#5A6872';
    expect(getChartKeyColor(value1)).toEqual(result);
  });
  it('should return #8c9ba5', () => {
    const result = '#8c9ba5';
    expect(getChartKeyColor(value2)).toEqual(result);
  });
  it('should return black', () => {
    const result = 'black';
    expect(getChartKeyColor(value3)).toEqual(result);
  });
});

describe('getChartKeyName', () => {
  const value1 = 'pr';
  const value2 = 'fl';
  const value3 = 'cm';
  const locale = 'es';

  it('should return In Progress', () => {
    const result = msgs.get('channel.deploy.status.progress', locale);
    expect(getChartKeyName(value1)).toEqual(result);
  });
  it('should return Failed', () => {
    const result = msgs.get('channel.deploy.status.failed', locale);
    expect(getChartKeyName(value2)).toEqual(result);
  });
  it('should return Completed', () => {
    const result = msgs.get('channel.deploy.status.completed', locale);
    expect(getChartKeyName(value3)).toEqual(result);
  });
});

describe('getModuleData', () => {
  const name1 = 'firstName';
  const name2 = 'secondName';

  const list = [
    {
      name: name1,
      cm: name1.length * 20,
      pr: name1.length * 30,
      fl: name1.length * 50,
    },
    {
      name: name2,
      cm: name2.length * 20,
      pr: name2.length * 30,
      fl: name2.length * 50,
    },
  ];
  const listDummy = [];

  it('should return data list of 2', () => {
    const result = {
      chartCardItems: [
        {
          name: name1,
          cm: name1.length * 20,
          pr: name1.length * 30,
          fl: name1.length * 50,
        },
        {
          name: name2,
          cm: name2.length * 20,
          pr: name2.length * 30,
          fl: name2.length * 50,
        },
      ],
    };
    expect(getModuleData(list)).toEqual(result);
  });
  it('should return blank array', () => {
    const result = { chartCardItems: [] };
    expect(getModuleData(listDummy)).toEqual(result);
  });
});