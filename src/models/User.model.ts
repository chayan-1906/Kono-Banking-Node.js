import mongoose, {Model} from "mongoose";
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
    userId: string;
    name: string;
    email: string;
    password: string;
    acc_type: 'savings' | 'current';
    createdAt: Date;
    updatedAt: Date;
}

interface IUserModel extends Model<IUser> {
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        lower: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    acc_type: {
        type: String,
        required: [true, 'Account type is required'],
        enum: ['savings', 'current'],
        default: 'savings',
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.userId = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;

            return {
                userId: ret.userId,
                ...ret,
            } as IUser;
        },
    },
});

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
});

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default UserModel;
