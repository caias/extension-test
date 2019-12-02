/**
 * 크롬 스토리지 정보 get/set
 */
interface IResult {
  msg?: string;
  status?: number;
}

const storages = {
  get<T>(type: string = 'local', key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const storage = chrome.storage[type];

      if (!storage) {
        reject({
          status: 500,
          msg: '[Storage] Error: storage is not defined',
        });
      }

      storage.get(key, function(result: T) {
        resolve(result[key]);
      });
    });
  },

  set<T>(type: string = 'local', data: T): Promise<IResult> {
    return new Promise<IResult>((resolve, reject) => {
      const storage = chrome.storage[type];

      if (!storage) {
        reject({
          status: 500,
          msg: '[Storage] Error: storage is not defined',
        });
      }

      storage.set(data, function () {
        resolve({
          status: 200,
          msg: '[Storage] Success',
        });
      });
    });
  },
};

export function storage<T>(method: string = 'get', type: string = 'local', params: T) {
  const storage = storages[method];
  return storage(type, params);
}
